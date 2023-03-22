import { useMemo } from "react";
import { MsgExecuteContract } from "@delphi-labs/shuttle";
import BigNumber from "bignumber.js";

import useWallet from "./useWallet";

type Props = {
  amount: string;
};

export default function useMarsClaim({ amount }: Props) {
  const wallet = useWallet();

  const msgs = useMemo(() => {
    if (!amount || !wallet) {
      return [];
    }

    if (BigNumber(amount).isLessThanOrEqualTo(0)) {
      return [];
    }
    
    return [
      new MsgExecuteContract({
        sender: wallet?.account.address || "",
        contract:
          "osmo1nkahswfr8shg8rlxqwup0vgahp0dk4x8w6tkv3rra8rratnut36sk22vrm",
        msg: {
          claim_rewards: {},
        },
      }),
    ];
  }, [wallet, amount]);

  return { msgs };
}