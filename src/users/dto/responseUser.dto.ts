import Address from '../address.entity';

export class ResponseUserDto {
  id?: number;
  email: string;
  name: string;
  address: Address;
}

export default ResponseUserDto;
