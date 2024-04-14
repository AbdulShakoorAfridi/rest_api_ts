import {v2 as cloudinary} from 'cloudinary';
import { config } from './config';



cloudinary.config({ 
  cloud_name: config.CLOUDINERY_CLOUD, 
  api_key: config.CLOUDINERY_API_KEY, 
  api_secret: config.CLOUDINERY_API_SECRET 
});

export default cloudinary;