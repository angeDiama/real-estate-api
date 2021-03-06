
// utilisation de fonction middleware pour filtrer les images
export const imageFileFilter = (req, file, callback) => {
    if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
        return callback(new Error('ce format d\'image n\'est pas pris en charge'), false);
    }
    callback(null, true);

};


export const editImageFileName = (req, file, callback) => {
    const name = file.originalname.split('.')[0];
    const realName = name.replace(/\s+/g, '_');
    const fileExtName = file.originalname.split('.').pop();
    const randomName = Array(2)
        .fill(null)
        .map(() => new Date ().getTime())
        .join('');
    callback(null,`${realName}_${randomName}.${fileExtName}`);
};

export const editFileName = (req, file, callback) => {
    const name = file.originalname.split('.')[0];
    const realName = name.replace(/\s+/g, '_');
    const fileExtName = file.originalname.split('.').pop();
    const randomName = Array(1)
        .fill(null)
        .map(() => new Date ().getTime())
        .join('');
    callback(null, `${realName}_${randomName}.${fileExtName}`);
};
