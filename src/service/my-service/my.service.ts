import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateMyDto } from 'src/dto/create-my.dto';
import { UpdateMyDto } from 'src/dto/update-product.dto';
import { MyEntity } from 'src/entity/my.entity';
import { Repository } from 'typeorm';

interface PaginatedResponse<MyEntity> {
    data: MyEntity[];
    total: number;
    page: number;
    limit: number;
    totalPages: number;
}

@Injectable()
export class MyService {

    constructor(protected readonly repository: Repository<MyEntity>) {}

    async entityExists(id: number) {
        
        const entity = await this.repository.findOneBy({key:id});

        if (!entity) {
            throw new NotFoundException("La entidad no se encontró.");
        }

        return entity;
    }

    async create(createDto: CreateMyDto) {
        return await this.repository.save(createDto);
    }

    async findAll() {
        return await this.repository.find();
    }

    async findAllPaginated(page: number = 1, limit: number = 30, sortField: string, 
        sortOrder: string): Promise<{ data: any[]; total: number; page: number; limit: number,
        
     }> {
        page = page <= 0 ? 1 : page;
        sortField = sortField || "key";
        sortOrder = sortOrder || "DESC";

        const [data, total] = await this.repository.findAndCount({
          skip: (page - 1) * limit,
          take: limit,
          order: {
            [sortField]: sortOrder,
          },
        });

        let totalPages = Math.ceil(total / limit);

        // return {
        //   data,
        //   total,
        //   page,
        //   limit,
        //   totalPages
        // };

        const response: PaginatedResponse<MyEntity> = {
            data,
            total,
            page,
            limit,
            totalPages: totalPages,
        };
        
        return response;
    }

    async findOne(id: number) {
        const entity = await this.entityExists(id);
        return entity;
    }

    async update(id: number, updateDto: UpdateMyDto) {
        await this.entityExists(id);
        return await this.repository.update(id,updateDto);
    }

    async remove(id: number) {
        await this.entityExists(id);
        await this.repository.softDelete(id);
        return true;
    }
}
