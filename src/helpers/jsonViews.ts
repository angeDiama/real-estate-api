export class JsonView {

    constructor(private data: any[], private message: string, private statusCode: number = 200) {
    }

    public static dataResponse(data, message: string = '', statusCode: number = 200) {
        return {
            data,
            message,
            statusCode
        };

    }

}
