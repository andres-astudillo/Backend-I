import mongoose from 'mongoose';

const url =
  'mongodb+srv://andresdiastullo:mB1UxEOKPwJRABXH@cluster0.gb3vo.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

export async function connectMongooseDB() {
  try {
    await mongoose.connect(url);
    console.log('Conexión exitosa a MongoDB Atlas');
  } catch (error) {
    console.error('Error al conectar a MongoDB Atlas:', error);
  }
}

export default mongoose;