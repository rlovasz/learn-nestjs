import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import Address from './address.entity';

@Injectable()
export class AddressesService {
  constructor(
    @InjectRepository(Address)
    private addressRepository: Repository<Address>,
  ) {}

  getAllAddressesWithUsers() {
    return this.addressRepository.find({ relations: ['user'] });
  }
}
