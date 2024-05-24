import { each } from "lodash";
import { isNativeAsset } from "../../helpers/isNativeAsset";

interface AnyObject {
  [key: string]: any;
}

type InteractiveDepositFlowProps = {
  assetCode: string;
  publicKey: string;
  sep24TransferServerUrl: string;
  token: string;
  claimableBalanceSupported: boolean;
  memo?: string;
  memoType?: "text" | "id" | "hash";
  sep9Fields?: AnyObject;
};

type DepositParams = {
  [key: string]: any;
  /* eslint-disable camelcase */
  asset_code: string;
  account: string;
  lang: string;
  claimable_balance_supported: string;
  /* eslint-enable camelcase */
};

export const interactiveDepositFlow = async ({
  assetCode,
  publicKey,
  sep24TransferServerUrl,
  token,
  claimableBalanceSupported,
  memo,
  memoType,
  sep9Fields,
}: InteractiveDepositFlowProps) => {
  const formData = new FormData();
  const postDepositParams: DepositParams = {
    asset_code: isNativeAsset(assetCode) ? "native" : assetCode,
    account: publicKey,
    lang: "en",
    claimable_balance_supported: claimableBalanceSupported.toString(),
    ...(memo && memoType ? { memo, memo_type: memoType } : {}),
    ...(sep9Fields ?? {}),
  };

  each(postDepositParams, (value, key) => formData.append(key, value));

  const response = await fetch(
    `${sep24TransferServerUrl}/transactions/deposit/interactive`,
    {
      method: "POST",
      body: formData,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  const interactiveJson = await response.json();

  console.log( `POST \`${sep24TransferServerUrl}/transactions/deposit/interactive\``)
  console.log("interactiveJson", interactiveJson);


  if (!interactiveJson.url) {
    throw new Error(
      "No URL returned from POST `/transactions/deposit/interactive`",
    );
  }

  return interactiveJson;
};
