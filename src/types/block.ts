export interface Block {
  index: number;
  transactions: string[];
  hash: string;
  prev_hash: string;
}