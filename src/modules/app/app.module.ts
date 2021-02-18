import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule, TypeOrmModuleAsyncOptions } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './../auth';
import { NewsModule } from '../news';
import { MenusModule } from '../menus';
import { UsersModule } from '../users';
import { TranslationsModule } from '../translations';
import { FrameworkModule } from '../framework';
import { QuizGameModule } from '../quizGame';
import { StoreModule } from '../store';

@Module({
  imports: [
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
          synchronize: configService.get('APP_ENV') === 'dev',
        } as TypeOrmModuleAsyncOptions;
      },
    }),
    ConfigModule.forRoot(),
    AuthModule,
    NewsModule,
    MenusModule,
    UsersModule,
    TranslationsModule,
    FrameworkModule,
    QuizGameModule,
    StoreModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
