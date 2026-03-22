export interface Block {
  index:number;
  hash:string;
  prev_hash:string;
  tx:any[];
}