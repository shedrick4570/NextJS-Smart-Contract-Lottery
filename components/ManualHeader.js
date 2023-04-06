import { useMoralis } from "react-moralis"
import { useEffect } from "react"

export default function ManualHeader() {
    const { enableWeb3, account, isWeb3Enabled, Moralis, deactivateWeb3, isWeb3EnableLoading } =
        useMoralis()

    useEffect(() => {
        if (
            !isWeb3Enabled &&
            typeof window !== "undefined" &&
            window.localStorage.getItem("connected")
        ) {
            enableWeb3()
        }
    }, [isWeb3Enabled])

    useEffect(() => {
        Moralis.onAccountChanged((newAccount) => {
            console.log(`Account changed to ${newAccount}`)
            if (newAccount == null) {
                window.localStorage.removeItem("connected")
                deactivateWeb3()
                console.log("Null Account found")
            }
        })
    }, [])

    return (
        <div>
            {account ? (
                <div>
                    Connected to: {account.slice(0, 6)}...{account.slice(account.length - 4)}
                </div>
            ) : (
                <button
                    onClick={async () => {
                        // await walletModal.connect()
                        const ret = await enableWeb3()
                        if (typeof ret !== "undefined") {
                            // depends on what button they picked
                            if (typeof window !== "undefined") {
                                window.localStorage.setItem("connected", "injected")
                            }
                        }
                    }}
                    disabled={isWeb3EnableLoading}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-auto"
                >
                    Connect
                </button>
            )}
        </div>
    )
}
