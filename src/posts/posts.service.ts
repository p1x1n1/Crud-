import { Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/creat-post.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Post } from './posts.model';
import { FilesService } from 'src/files/files.service';

@Injectable()
export class PostsService {
    
    constructor(@InjectModel(Post) private postRepository: typeof Post ,
                private fileService: FilesService
    ){}

    async createPost(dto: CreatePostDto, image: any){
        const fileName = await this.fileService.createFile(image);
        const post = await this.postRepository.create({...dto, image: fileName})
        return post;
    }
}
