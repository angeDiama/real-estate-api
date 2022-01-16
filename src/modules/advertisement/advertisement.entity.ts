import {Column, CreateDateColumn, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity('advertisement')
export class AdvertisementEntity {

    @PrimaryGeneratedColumn({name: 'advertisement_id'})
    private id: number;

    @Column({type: 'varchar', name: 'title', length: 191, nullable: true})
    private title: string;

    @Column({type: 'varchar', name: 'description', length: 191, nullable: true})
    private description: string;

    @CreateDateColumn({name: 'created_at', nullable: true})
    private createdAt: Date;


    constructor() {
    }

    public getAdvertisementId(): number {
        return this.id;
    }

    public getTitle(): string {
        return this.title;
    }

    public setTitle(title: string): void {
        this.title = title;
    }

    public getDescription(): string {
        return this.description;
    }

    public setDescription(description: string): void {
        this.description = description;
    }

    public getCreatedAt(): Date {
        return this.createdAt;
    }
}
