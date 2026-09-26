import z from "zod";

const schema = z.object({
    description : z.string().min(20, 'enter minimum 20 word description.')
})

export const validateFileData = async (req, res, next) => {
    const description = req.body
    const files = req.files
    
    if(!files || files.length === 0){
        res.status(400).send('At least one file select...')
    }
    else if(!description){
        res.status(400).send('missing description')
    }

    const result = schema.safeParse(description)

    if(!result.success) {
        res.status(400).json({
            success : false,
            message : result.error.flatten().fieldErrors
        })
    }else{
        next();
    }

}