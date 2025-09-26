import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class BooksService {
  constructor(private prisma: PrismaService) {}

  findAll() {
    return this.prisma.book.findMany({ include: { author: true } });
  }

  findOne(id: number) {
    return this.prisma.book.findUnique({ where: { id }, include: { author: true } });
  }

  create(title: string, authorId: number) {
    return this.prisma.book.create({
      data: { title, authorId },
      include: { author: true },
    });
  }

  update(id: number, title?: string, authorId?: number) {
    return this.prisma.book.update({
      where: { id },
      data: { title, authorId },
      include: { author: true },
    });
  }

  delete(id: number) {
    return this.prisma.book.delete({ where: { id } });
  }
}
