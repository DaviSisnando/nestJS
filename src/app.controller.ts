import { Body, Controller, Delete, Get, Param, Post, Put, Res, CACHE_MANAGER } from '@nestjs/common';
import { Response } from 'express';
import { HttpService } from '@nestjs/axios';
import { Cache } from 'cache-manager';
import { AppService } from './app.service';
import { User } from './users/user.interface';

@Controller('users')
export class AppController {
  constructor(private readonly appService: AppService, private httpService: HttpService) {}

  @Get()
  async index (@Res() response: Response) {
    const users = await this.appService.index()
    return response.json({ data: users })
  }

  @Get(':id')
  async show (@Param('id') id: string, @Res() response: Response) {
    const user = await this.appService.show(id)
    if(!user || user.length === 0) return response.status(404).json({ error: 'User not found with this id.' })
    return response.json({ data: user })
  }

  @Post()
  async createUser(@Body() user : User, @Res() response: Response) {
    const newEntry = Object.assign({}, user)
    if(newEntry.cep.length !== 8) return response.status(400).json({ error: 'CEP must be exactly 8 digits.' })
    await this.appService.createUser(newEntry);
    return response.json({ data: newEntry })
    // return this.appService.createUser();
  }

  @Put(':id')
  async updateUser(@Param('id') id: string, @Body() user : User, @Res() response: Response) {
    try {
      const updatedUser = Object.assign({}, user)
      if(updatedUser.cep.length !== 8) return response.status(400).json({ error: 'CEP must be exactly 8 digits.' })
      let updated = await this.appService.updateUser(updatedUser, id)
      if(updated.affected === 0) return response.status(404).json({ error: 'User not found with this id.' })
      return response.json({ data: updatedUser })
    } catch(e) {
      return response.status(400).json({ error: e.message })
    }
  }

  @Delete(':id')
  async deleteUser(@Param('id') id: string, @Res() response: Response) {
    try {
      let deleted = await this.appService.deleteUser(id)
      if(deleted.affected === 0) return response.status(404).json({ error: 'User not found with this id.' })
      return response.json({ data: `User with id: ${id} sucesfully deleted.` })
    } catch(e) {
      return response.status(400).json({ error: e.message })
    }
  }

  @Post('/cpf')
  async findByCpf(@Body() cpf : User["cpf"], @Res() response: Response) {
    try {
      const user = Object.assign({}, cpf)
      console.log(user["cpf"])
      if(user["cpf"] !== undefined) {
        let userCpf = await this.appService.findByCpf(cpf)
        if(!userCpf) return response.status(404).json({ error: 'User not found with this cpf.' })
        return response.json({ data: userCpf })
      } else {
        return response.status(400).json({ error: 'Please verify the field.' })
      }
    } catch(e) {
      return response.status(400).json({ error: e.message })
    }
  }

  @Post('/cep')
  async findByCep(@Body() cep : User["cep"], @Res() response: Response) {
    try {
      const user = Object.assign({}, cep)
      if(user["cep"] !== undefined) {
        let userCep = await this.appService.findByCep(cep)
        if(!userCep) return response.status(404).json({ error: 'User not found with this cep.' })
        let {rua, cidade, estado} = await this.appService.viaCep(user["cep"])
        await this.appService.updateUser({...userCep, logradouro: rua, cidade, estado}, userCep.id)
        return response.status(200).json({ data: `User with id: '${userCep.id}' updated sucessfully.` })
      } else {
        return response.status(400).json({ error: 'Please verify the field.' })
      }
    } catch(e) {
      return response.status(400).json({ error: e.message })
    }
  }
}
