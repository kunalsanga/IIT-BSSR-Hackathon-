async function connectMetaMask() {
  if (window.ethereum) {
    try {
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      if (accounts.length > 0) {
        const account = accounts[0];
        document.querySelector('.account').textContent = account;
        getBalance(account);
        console.log("Connected to MetaMask with account:", account);
      } else {
        console.log("No accounts found.");
      }
    } catch (error) {
      console.error("Error connecting to MetaMask:", error);
    }
  } else {
    alert("MetaMask is not installed. Please install it to use this app.");
  }
}

async function getBalance(account) {
  const balance = await window.ethereum.request({
    method: 'eth_getBalance',
    params: [account, 'latest']
  });
  document.querySelector('.balance').textContent = (parseInt(balance, 16) / 1e18).toFixed(4);
}

async function sendEther() {
  const recipient = document.querySelector('.recipient').value;
  const amount = document.querySelector('.amount').value;
  const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
  const account = accounts[0];

  const transactionParameters = {
    to: recipient,
    from: account,
    value: '0x' + (amount * 1e18).toString(16),
  };

  try {
    await window.ethereum.request({
      method: 'eth_sendTransaction',
      params: [transactionParameters],
    });
    showModal();
  } catch (error) {
    console.error(error);
  }
}

function showModal() {
  const modal = document.getElementById("successModal");
  const closeButton = document.querySelector(".close-button");

  modal.style.display = "block";

  closeButton.onclick = function() {
    modal.style.display = "none";
  }

  window.onclick = function(event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  }
}

function depositEther() {
  const depositAmount = parseFloat(prompt("Enter amount to deposit in ETH:"));
  if (!isNaN(depositAmount) && depositAmount > 0) {
    const currentBalance = parseFloat(document.querySelector('.balance').textContent);
    const newBalance = currentBalance + depositAmount;
    document.querySelector('.balance').textContent = newBalance.toFixed(4);
    alert(`Deposited ${depositAmount} ETH successfully!`);
  } else {
    alert("Invalid amount entered.");
  }
}

document.querySelector('.connectButton').addEventListener('click', connectMetaMask);
document.querySelector('.sendButton').addEventListener('click', sendEther);
document.querySelector('.depositButton').addEventListener('click', depositEther); 