

contract_address = "XXXXX" #this should be the contract on Skale
wallet_address = "0x59DcC1e1B1F43BaD14DA3b8040995677d6fc923" #ArchChainONE account- replace with wallet and key credentials under .git ignore

wallet_private_key = "2366b847b1452a873139138443b88957f084e4add05f00d3074497ed404db0d0"
infura_url = "XXXXXXX" #Skale Node inserted here.


#@dev: entries to use with the anaconda python inside blender/dynamo/Grrasshopper

path = "/opt/anaconda3/lib/python3.8/site-packages" #enter your web3 location here - This is the macosx version
#path = "c:\\Users\\calys\\anaconda3\\envs\\Dynamo383\\Lib\\site-packages" #enter your web3 location here - This is the windows version


contract_abi =  "" #insert here the compiled contract abi



import time
import sys
sys.path.append(path)
from web3 import Web3, HTTPProvider

#following linees make topologic work on linux with Blender
#from topologic import Vertex, Topology
#import cppyy

#v = Vertex.ByCoordinates(10,20,30)
string = str('XXXXXXX')
w3 = Web3(HTTPProvider(infura_url))


smartContract = w3.eth.contract(address=contract_address, abi=contract_abi)

receipts = []

#the next function call mints the NFT
nonce = w3.eth.get_transaction_count(wallet_address)
tx_dict = smartContract.functions.safeMint(address, string).buildTransaction({
    'chainId' : 3,
    'gas' : 2100000,  #some of this was throwing errors, double check gas amounts.
    'gasPrice' : w3.toWei('50', 'gwei'),
    'nonce' : nonce,
})



signed_tx = w3.eth.account.sign_transaction(tx_dict, wallet_private_key)
tx_hash = w3.eth.send_raw_transaction(signed_tx.rawTransaction)
tx_receipt = w3.eth.waitForTransactionReceipt(tx_hash, timeout=120, poll_latency=0.1)
receipts.append(tx_receipt)



outputList = []
for tx_receipt in receipts:
    receipt = []
    receipt.append('blockHash: '+str(tx_receipt['blockHash']))
    receipt.append('blockNumber: '+str(tx_receipt['blockNumber']))
    receipt.append('contractAddress: '+str(tx_receipt['contractAddress']))
    receipt.append('cumulativeGasUsed: '+str(tx_receipt['cumulativeGasUsed']))
    receipt.append('from: '+str(tx_receipt['from']))
    receipt.append('gasUsed: '+str(tx_receipt['gasUsed']))
    receipt.append('logs: '+str(tx_receipt['logs']))
    receipt.append('to: '+str(tx_receipt['to']))
    receipt.append('transactionHash: '+str(tx_receipt['transactionHash']))
    receipt.append('tansactionIndex: '+str(tx_receipt['transactionIndex']))
    outputList.append(receipt)


#amend the outoput list if you are using Topologic on Dynamo.
print(outputList)
