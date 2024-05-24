import { Keypair, Transaction } from "@stellar/stellar-sdk";

export const sign = async ({
  challengeTransaction,
  networkPassphrase,
  secretKey,
  walletBackendEndpoint,
}: {
  challengeTransaction: Transaction;
  networkPassphrase: string;
  secretKey: string;
  walletBackendEndpoint: string;
}) => {
  console.log({
    title:
      "We’ve received a challenge transaction from the server that we need the sending anchor to sign with their Stellar private key",
  });

  for (const op of challengeTransaction.operations) {
    if (op.type === "manageData" && op.name === "client_domain") {
      // The anchor server supports client attribution, get a signature from the demo wallet backend server
      console.log({
        title:
          "anchor supports SEP-10 client attribution, requesting signature from demo wallet backend...",
      });
      const params = {
        transaction: challengeTransaction.toEnvelope().toXDR("base64"),
        network_passphrase: networkPassphrase,
      };
      console.log({ title: "POST `/sign`", body: params });
      const urlParams = new URLSearchParams(params);
      const walletBackendSignEndpoint = `${walletBackendEndpoint}/sign`;

      const result = await fetch(walletBackendSignEndpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: urlParams.toString(),
      });
      const resultJson = await result.json();
      console.log({ title: "POST `/sign`", body: resultJson });
      challengeTransaction = new Transaction(
        resultJson.transaction,
        resultJson.network_passphrase,
      );
      console.log({ title: "challenge signed by demo wallet backend" });
      break;
    }
  }

  const envelope = challengeTransaction.toEnvelope().toXDR("base64");
  const transaction = new Transaction(envelope, networkPassphrase);
  transaction.sign(Keypair.fromSecret(secretKey));

  console.log({ title: "SEP-10 signed transaction", body: transaction });
  console.log({
    title: "SEP-10 signed transaction, `base64` encoded",
    body: transaction.toEnvelope().toXDR("base64"),
  });

  return transaction;
};
