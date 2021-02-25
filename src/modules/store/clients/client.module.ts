import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StoreClient } from './client.entity';
import { StoreClientService } from './client.service';
import { StoreClientController } from './client.controller';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    TypeOrmModule.forFeature([StoreClient]),
  ],
  exports: [StoreClientService],
  controllers: [StoreClientController],
  providers: [StoreClientService],
})
export class StoreClientsModule {}
