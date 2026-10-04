export function earnsPoint(input: { promptMeetsRequirements: boolean; judgmentMeetsRequirements: boolean; correctionAddressesGap: boolean; explanationSound: boolean }, correcting: boolean) {
 return input.promptMeetsRequirements && input.judgmentMeetsRequirements && (!correcting || input.correctionAddressesGap && input.explanationSound);
}
