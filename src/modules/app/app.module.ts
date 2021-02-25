import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule, TypeOrmModuleAsyncOptions } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { NewsModule } from '../news';
import { FrameworkModule } from '../framework';
import { QuizGameModule } from '../quizGame';
import { StoreModule } from '../store';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        return {
          type: configService.get('DATABASE_TYPE'),
          host: configService.get('DATABASE_HOST'),
          port: configService.get('DATABASE_PORT'),
          username: configService.get('DATABASE_USERNAME'),
          password: configService.get('DATABASE_PASSWORD'),
          database: configService.get('DATABASE_DATABASE'),
          entities: [__dirname + './../**/**.entity{.ts,.js}'],
          migrationsTableName: 'migrations',
          migrations: ['src/migrations/*.ts'],
          migrationsRun: true,
          cli: {
            migrationsDir: 'migration',
          },
          synchronize: configService.get('APP_ENV') === 'dev',
        } as TypeOrmModuleAsyncOptions;
      },
    }),
    ConfigModule.forRoot(),
    NewsModule,
    FrameworkModule,
    QuizGameModule,
    StoreModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
