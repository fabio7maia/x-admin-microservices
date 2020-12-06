import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NewEntity } from './new.entity';
import { NewsService } from './new.service';
import { NewsController } from './new.controller';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    TypeOrmModule.forFeature([NewEntity]),
  ],
  exports: [NewsService],
  controllers: [NewsController],
  providers: [NewsService],
})
export class NewsModule {}
