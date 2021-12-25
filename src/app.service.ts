import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { HttpService } from '@nestjs/axios';
import axios from 'axios'
import { User } from './users/user.interface';
import { UserEntity } from '../src/model/user.entity';

@Injectable()
export class AppService {
  constructor(@InjectRepository(UserEntity) private readonly repo: Repository<UserEntity>, private httpService: HttpService) {}

  async createUser(user: User) {
    try {
      return await this.repo.save(user);
    } catch (e) {
      console.log(e)
      return e
    }
  }

  async index() {
    try {
      return await this.repo.find({});
    } catch(e) {
      console.log(e)
      return e
    }
  }

  async show(id: string) {
    try {
      return await this.repo.find({id})
    } catch(e) {
      console.log(e)
      return e
    }
  }

  async updateUser(user: User, id: string) {
    try {
      return await this.repo.update(id, user)
    } catch(e) {
      return e
    }
  }

  async deleteUser(id: string) {
    try {
      return await this.repo.delete(id)
    } catch(e) {
      return e
    }
  }

  async findByCpf(cpf: string) {
    let userCpf = await this.repo.findOne(cpf)
    return userCpf
  }

  async findByCep(cep: string) {
    let userCep = await this.repo.findOne(cep)
    return userCep
  }

  async viaCep(cep: string) {
    try {
      let {data} = await axios.get(`https://viacep.com.br/ws/${cep}/json/`)
      if(data["erro"] === true) {
        return { error: 'Invalid CEP' }
      }
      return {rua: data.logradouro, cidade: data.localidade, estado: data.uf}
    } catch(e) {
      return e
    }
  }
}
