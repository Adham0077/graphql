import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AuthorsService {
  constructor(private prisma: PrismaService) {}

  findAll() {
    return this.prisma.author.findMany({ include: { books: true } });
  }

  findOne(id: number) {
    return this.prisma.author.findUnique({ where: { id }, include: { books: true } });
  }

  create(name: string, age: number) {
    return this.prisma.author.create({
      data: { name, age },
    });
  }

  update(id: number, name?: string, age?: number) {
    return this.prisma.author.update({
      where: { id },
      data: { name, age },
    });
  }

  delete(id: number) {
    return this.prisma.author.delete({ where: { id } });
  }
}
