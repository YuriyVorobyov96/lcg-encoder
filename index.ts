class Encoder {
  private m;

  /**
   * @param {string} charset - the set of characters that will be used to encode and decode the message.
   * @param {number} a - the multiplier
   * @param {number} c - the increment
   */
  constructor(
    private charset: string = ' !"#$%&\'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_`abcdefghijklmnopqrstuvwxyz{|}~йцукенгшщзхъфывапролджэячсмитьбюЙЦУКЕНГШЩЗХЪФЫВАПРОЛДЖЭЯЧСМИТЬБЮ',
    private a: number = 106,
    private c: number = 1283,
  ) {
    this.m = this.charset.length;
  }

  /**
   * Generate a sequence
   * @param {string} message - the message to be encrypted.
   * @param {number} base - the base of the random number generator.
   * @returns a sequence after processing
   */
  public run (message: string, base: number = 31): string {
    const key = this.getRandomArray(message.length, base);
    const charCodes = message.split('').map(char => this.getNumberByChar(char));
  
    return charCodes.map((code, idx) => this.getCharByNumber(code ^ key[idx])).join('');
  }

  /**
   * Generate an array of pseudorandom numbers
   * @param {number} length - the length of the array to be generated
   * @param {number} seed - the initial value of the random number generator
   * @returns an array of pseudorandom numbers.
   */
  private getRandomArray(length: number = 10, seed: number = 2): number[] {
    const rand = () => seed = (this.a * seed + this.c) % this.m;
  
    return Array<number>(length).fill(0).map(rand);
  }

  /**
   * Get the index of the character in the charset
   * @param {string} char - the character to get the number for.
   * @returns the index of the character in the charset.
   */
  private getNumberByChar (char: string): number {
    if (char.length > 1) {
      throw new Error(`Can't get code for string`);
    }
  
    const idx = this.charset.indexOf(char);
  
    if (!~idx) {
      throw new Error(`The symbol '${char}' is missing in the charset`);
    }
  
    return idx;
  }

  /**
   * Get the character from the charset
   * @param {number} num - the number of the symbol in the charset
   * @returns the character at the index of the number passed in.
   */
  private getCharByNumber (num: number): string {
    const char = this.charset[num];
  
    if (!char) {
      throw new Error(`Can't get the symbol by the code '${num}'`);
    }
  
    return char;
  }
}

const encoder = new Encoder();

const message = 'Simple test message!';

const encodedMessage = encoder.run(message);
const decodedMessage = encoder.run(encodedMessage);

console.log({ encodedMessage, decodedMessage });
