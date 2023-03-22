import { useMemo } from "react";
import { MsgExecuteContract } from "@delphi-labs/shuttle";
import BigNumber from "bignumber.js";

import { getTokenDecimals } from "@/config/tokens";

import useWallet from "./useWallet";

type Props = {
  amount: string;
};

export default function useMarsDeposit({ amount }: Props) {
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
          "osmo1c3ljch9dfw5kf52nfwpxd2zmj2ese7agnx0p9tenkrryasrle5sqf3ftpg",
        msg: {
          deposit: {},
        },
        funds: [{ denom: "uosmo", amount: BigNumber(amount).times(getTokenDecimals("uosmo")).toString() }],
      }),
    ];
  }, [wallet, amount]);

  return { msgs };
}