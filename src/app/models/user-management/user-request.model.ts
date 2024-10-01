export interface UserRequest {
  userId?: number;           
  name: string;          
  username: string;
  email?: string;                    
  mobileNo: string;                  
  password?: string;     
  address: string;     
  city: string;     
  state: string;     
  countryId: number;
  countryName?: string; 
  createdAt?: string;   
  updatedAt?: string;        
  walletDetails?: string[];     
}

