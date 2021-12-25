import { PrimaryGeneratedColumn, Column, Entity } from 'typeorm';
//Nome, telefone, CPF, CEP, Logradouro, Cidade e Estado.

@Entity()
export class UserEntity{
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 200 })
  nome: string;

  @Column({ type: 'varchar', length: 30 })
  telefone: string;

  @Column({ type: 'varchar', length: 18 })
  cpf: string;

  @Column({ type: 'varchar', length: 10 })
  cep: string;

  @Column({ type: 'varchar', length: 100 })
  logradouro: string;

  @Column({ type: 'varchar', length: 20 })
  cidade: string;

  @Column({ type: 'varchar', length: 20 })
  estado: string;
}