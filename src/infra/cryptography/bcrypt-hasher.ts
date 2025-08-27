import { HashCompare } from "@/domain/forum/application/cryptography/hash-compare";
import { HashGenerator } from "@/domain/forum/application/cryptography/hash-generator";
import { hash, compare } from "bcryptjs";

export class BcryptHasher implements HashGenerator, HashCompare {
  private HASH_SALT_LENGHT = 8

  async hash(plain: string): Promise<string> {
    return hash(plain, this.HASH_SALT_LENGHT)
  }

  async compare(plain: string, hash: string): Promise<boolean> {
    return compare(plain, hash)
  }
}