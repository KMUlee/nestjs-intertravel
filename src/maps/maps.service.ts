import { Injectable, UnprocessableEntityException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { request } from "request";

import { Connection, Repository } from 'typeorm';
import { UserEntity } from '../entities/user.entity';
@Injectable()
export class MapsService {

    constructor(
        @InjectRepository(UserEntity)
        private usersRepository: Repository<UserEntity>,
    ) { }

    async testFunction(testData: string): Promise<string> {
        return testData;
    }

    async reverseGio(id: string, latitude: string, longitude: string): Promise<any> {
        const user = await this.usersRepository.findOneBy({ id: id });
        if (!user) {
            throw new UnprocessableEntityException('해당 유저를 찾을 수 없습니다.');
        } else {
            const options = {
                headers :{"Authorization": "KakaoAK eb2588fdaa1c20903adda5a2e929e6f3"},
                uri: "https://dapi.kakao.com/v2/local/geo/coord2regioncode.json",
                qs: {
                    x: longitude,
                    y: latitude,
                }

            };
            request(options, function (error, response, body) {
                if (error) {
                    console.log(error);
                    throw new UnprocessableEntityException(error);
                } else {
                    console.log(body);
                    return body;
                }
            })

            

        }
    }
}