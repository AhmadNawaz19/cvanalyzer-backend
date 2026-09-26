import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const FilesToDb = async (data, id) => {
    try {
        const records = await Promise.all(
            data.map(file =>
                prisma.userFile.create({
                    data: {
                        description: file.description,
                        userId: id,
                        files: file.file,
                    },
                })
            )
        );
        return records
    } catch (err) {
        console.log(err)
    }
}

export const AnalyzedFile = async (userID, data, description) => {
    try{
        const result = await prisma.analyzeFile.create({
            data : {
                userId : userID,
                jobType : data.jobtype,
                userFileId  : Number(data.fileID),
                url : data.url,
                name : data.name,
                description : description
            }
        })
        console.log(result)
    }catch(err) {
        console.log(err)
    }
}