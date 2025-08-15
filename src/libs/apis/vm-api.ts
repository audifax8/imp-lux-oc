import { IVMAPI } from '@/declarations/interfaces';

export class VMAPI implements IVMAPI {
  api: IVMAPI;
  constructor(api: IVMAPI) {
    this.api = api;
  }
  VMConfiguratorsWidget(): void {
    throw new Error('Method not implemented.');
  }
  VMWidgetApp(): void {
    throw new Error('Method not implemented.');
  }
  clearPictureVideoIds(): void {
    throw new Error('Method not implemented.');
  }
  VMWidgetQRCode(): void {
    throw new Error('Method not implemented.');
  }
  async isBrowserSupported(): Promise<boolean> {
    return await this.api.isBrowserSupported();
  }
  isUPCSupported(): void {
    throw new Error('Method not implemented.');
  }
  isValidConfig(): void {
    throw new Error('Method not implemented.');
  }
  reset(): void {
    throw new Error('Method not implemented.');
  }
  warmUp(): void {
    throw new Error('Method not implemented.');
  }
}
