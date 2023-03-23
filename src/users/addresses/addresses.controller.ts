import { Controller, Get } from '@nestjs/common';
import { AddressesService } from './addresses.service';
import { ApiTags } from '@nestjs/swagger';

@Controller('addresses')
@ApiTags('Addresses')
export class AddressesController {
  constructor(private readonly addressesService: AddressesService) {}

  @Get()
  getAllAddresses() {
    this.addressesService.getAllAddressesWithUsers();
  }
}
