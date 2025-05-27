import * as dotenv from 'dotenv';
dotenv.config();

export class Config {
  // URL staging
  static get urlStating(): string { 
    return process.env.URL_BIGTIME_STG || ''; 
  }

  // Thông tin đăng nhập cho các vai trò khác nhau
  static get employee_username(): string { 
    return process.env.EMPLOYEE_USERNAME || ''; 
  }
  
  static get employee_password(): string { 
    return process.env.EMPLOYEE_PASSWORD || ''; 
  }

  static get manager_username(): string { 
    return process.env.MANAGER_USERNAME || ''; 
  }
  
  static get manager_password(): string { 
    return process.env.MANAGER_PASSWORD || ''; 
  }

  static get admin_username(): string { 
    return process.env.ADMIN_USERNAME || ''; 
  }
  
  static get admin_password(): string { 
    return process.env.ADMIN_PASSWORD || ''; 
  }

  // Connect database
  static get db_url(): string { 
    return process.env.DB_URL || ''; 
  }
  
  static get db_username(): string { 
    return process.env.DB_USERNAME || ''; 
  }
  
  static get db_password(): string { 
    return process.env.DB_PASSWORD || ''; 
  }
}

export default Config;