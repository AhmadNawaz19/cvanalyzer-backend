import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const createUser = async (data) => {
  try {
    const result = await prisma.users.create({
      data: {
        name: data.name,
        email: data.email,
        password: data.password,
      },
    });

    return result;
  } catch (error) {
    console.error(error);
  }
}

export const CreateProviderUser = async (data) => {
  try {
    let result = await prisma.users.create({
      data : {
        name : data.name,
        email : data.email,
        password : 'null',
        provider : data.provider,
        profile : data.avatar_url || data.picture
      }
    })
    return result
  }catch(err) {
    console.log(err)
  }
}

export const checkUserExist = async (email) => {
  const result = await prisma.users.findFirst({
    where : {
      email,
    }
  })
  return result
}

export const updateNamePicture = async (file,userName, email) => {
  const result = await prisma.users.update({
    where : {
      email
    },
    data : {
      profile : file,
      name : userName
    }
  })
  if(!result.email){
    return {
      "success" : false,
      "message" : "profile not updata"
    }
  }else{
    return {
      "success" : true,
      "message" : "profile updata",
      "profile" : result.profile,
      "userName" : result.name
    }
  }
}

export const updateName = async (userName, email) => {
  console.log(userName)
  const result = await prisma.users.update({
    where : {
      email
    },
    data : {
      name : userName
    }
  })
  if(!result.email){
    return {
      "success" : false,
      "message" : "profile not updata"
    }
  }else{
    return {
      "success" : true,
      "message" : "profile updata",
      "userName" : result.name
    }
  }
}

export const updatePicture = async (file, email) => {
  const result = await prisma.users.update({
    where : {
      email
    },
    data : {
      profile : file
    }
  })
  if(!result.email){
    return {
      "success" : false,
      "message" : "profile not updata"
    }
  }else{
    return {
      "success" : true,
      "message" : "profile update",
      "profile" : result.profile
    }
  }
}

export const fetchUserData = async (req, res) => {
  const result = await prisma.users.findFirst({
    where : {
      email : req.user.email,
    }
  })
  res.status(200).json({
    success : true,
    message : 'data fetched',
    data : {
      name : result?.name,
      profile : result?.profile
    }
  }) 
}

export const historyData = async (req, res) => {
  console.log(req.user)
  const result = await prisma.userFile.findMany({
    where : {
      userId : req.user.id
    }
  })
  res.send(result)
}

export const PreferCV = async (req, res) => {
  const result = await prisma.analyzeFile.findMany({
    where : {
      userId : req.user.id
    }
  })
  if(!result){
    res.status(404).json({
      success : false,
      message : "data not found",
    })
  }else{
    res.status(200).json({
      success : 'ok',
      message : "data found",
      data : result
    })
  }
}


export const reviews = async (req,  res) => {
  // console.log(req.body, req.user)
  const result = await prisma.userReview.create({
    data : {
      userId : req.user.id,
      rating : req.body.rating,
      message : req.body.message
    }
  })
  if(!result) {
    res.status(404).json({
      success : false,
      messsage : 'bad request'
    })
  }else{
    res.status(200).json({
      success : true,
      messsage : 'Review Placed'
    })
  }
}

export const getReviews = async (req, res) => {
  const result = await prisma.userReview.findMany({
    take: 6,
    orderBy: {
      createdAt: "desc",
    },
    include : {
      user : {
        select : {
          name : true,
          profile : true
        }
      }
    }
  })
  if(!result) {
    res.status(404).json({
      success : false,
      messsage : 'bad request'
    })
  }else{
    res.status(200).json({
      success : true,
      messsage : 'Reviews Get',
      data : result
    })
  }
}
export const getAllReviews = async (req, res) => {
  const result = await prisma.userReview.findMany({
    include : {
      user : {
        select : {
          name : true,
          profile : true
        }
      }
    }
  })
  if(!result) {
    res.status(404).json({
      success : false,
      messsage : 'bad request'
    })
  }else{
    res.status(200).json({
      success : true,
      messsage : 'Reviews Get',
      data : result
    })
  }
}


export const deleteAllUserFiles = async (req, res) => {
  try {
    const result = await prisma.$transaction([
      prisma.analyzeFile.deleteMany({}),
      prisma.userFile.deleteMany({}),
    ]);

    return res.status(200).json({
      success: true,
      message: "All user files and related analysis records deleted successfully",
      deletedAnalyzeFiles: result[0].count,
      deletedUserFiles: result[1].count,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Failed to delete user files",
    });
  }
};