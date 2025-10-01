import { inject } from "inversify";
import { TYPES } from "@/di/types/types";
import { IDOPRepository } from "@/domain/interfaces";
import { IdentifyNFCRequest } from "@/domain/entities";

export class DOPLogNFCHandler {
  private readonly _dopRepository: IDOPRepository;

  constructor(
    @inject(TYPES.IDOPRepository)
    dopRepository: IDOPRepository
  ) {
    this._dopRepository = dopRepository;
  }

  async handle({ nfcData }: { nfcData: IdentifyNFCRequest }) {
    const identityResponse = await this._dopRepository.identifyNFC(nfcData);
    if (!identityResponse || !identityResponse.data) {
      throw new Error("Có lỗi xảy ra trong quá trình nhận diện NFC");
    }

    return {
      success: true,
      data: identityResponse.data,
    };
  }
}
