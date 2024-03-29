import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import Address from './address.entity';
import { AddressesController } from './addresses.controller';
import { AddressesService } from './addresses.service';

@Module({
  imports: [TypeOrmModule.forFeature([Address])],
  controllers: [AddressesController],
  providers: [AddressesService],
})
export class AddressesModule {}
