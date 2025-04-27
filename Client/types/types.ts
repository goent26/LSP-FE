// User types
export type UserRole = 'asesor' | 'peserta';

export interface User {
  id: number;
  username: string;
  email: string;
  role: UserRole;
  password?: string;
}

export interface Peserta{
  id: string;
  username:string;
  email:string;
  nik: string;
  skema: string;
}

// Email	Nama Asesor	No.Registrasi	Asal Sekolah	Kompetensi	Masa Berlaku	Aksi
export interface Asesor{
  id: string;
  username:string;
  email:string;
  // nik: string;
  // skema: string;
}

export interface CreateUserPayload {
  username: string;
  email: string;
  password: string;
  // role: UserRole;
}

export interface UpdateUserPayload {
  username: string;
  email: string;
  password: string;
  role: UserRole;
}

// Skema types
export interface Skema {
  id: number;
  judul_skema: string;
  jenis: string;
}

export interface CreateSkemaPayload {
  judul_skema: string;
  jenis: string;
}

export interface UpdateSkemaPayload {
  judul_skema: string;
  jenis: string;
}

// TUK START


export interface JadwalUjian {
  id: string;
  tanggal: string; 
  tuk_id: string;
}

export interface TUK {
  id: string;
  nama_tuk: string;
  kode_tuk: string;
  alamat: string;
  jenis: string;
  skema_id: string;
  skema?: Skema; 
  JadwalUjian?: JadwalUjian; 
}

export interface CreateTUKData {
  nama_tuk: string;
  kode_tuk: string;
  alamat: string;
  jenis: string;
  skema_id: string;
}

export interface UpdateTUKData {
  nama_tuk?: string;
  kode_tuk?: string;
  alamat?: string;
  jenis?: string;
  skema_id?: string;
}