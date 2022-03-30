import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule, TypeOrmModuleAsyncOptions } from '@nestjs/typeorm';
import { PassportModule } from '@nestjs/passport';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { NewsModule } from '../news';
import { FrameworkModule } from '../framework';
import { QuizGameModule } from '../quizGame';
import { StoreModule } from '../store';

import { LoggerMiddleware, LoggerModule } from '../logger';
import { TransformHelper } from '../../helpers';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const dbUrl: string = configService.get('DATABASE_URL') || '';
        let dbType: string = configService.get('DATABASE_TYPE');
        let dbHost: string = configService.get('DATABASE_HOST');
        let dbPort: string = configService.get('DATABASE_PORT');
        let dbUsername: string = configService.get('DATABASE_USERNAME');
        let dbPassword: string = configService.get('DATABASE_PASSWORD');
        let dbDatabase: string = configService.get('DATABASE_DATABASE');

        if (dbUrl.length) {
          const res = TransformHelper.extractValue(
            dbUrl,
            '{{dbType}}://{{dbUsername}}:{{dbPassword}}@{{dbHost}}:{{dbPort}}/{{dbDatabase}}',
          );

          dbType = res.dbType;
          dbHost = res.dbHost;
          dbPort = res.dbPort;
          dbUsername = res.dbUsername;
          dbPassword = res.dbPassword;
          dbDatabase = res.dbDatabase;
        }

        return {
          type: dbType,
          host: dbHost,
          port: dbPort,
          username: dbUsername,
          password: dbPassword,
          database: dbDatabase,
          entities: [__dirname + './../**/**.entity.{ts,js}'],
          migrationsTableName: 'migrations',
          migrations: ['src/migrations/*.js'],
          migrationsRun: configService.get('APP_ENV') === 'dev',
          cli: {
            migrationsDir: 'migration',
          },
          synchronize: configService.get('APP_ENV') === 'dev',
        } as TypeOrmModuleAsyncOptions;
      },
    }),
    ConfigModule.forRoot(),
    LoggerModule,
    NewsModule,
    FrameworkModule,
    QuizGameModule,
    StoreModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware);
  }
}
