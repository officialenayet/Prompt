async function generateNames() {
  const gender = document.getElementById("gender").value;
  const output = document.getElementById("output");
  output.textContent = "লোড হচ্ছে...";
  try {
    const res = await fetch(`/generate?gender=${gender}&count=20`);
    const data = await res.json();
    output.textContent = data.result;
  } catch {
    output.textContent = "সার্ভারে সমস্যা হয়েছে। আবার চেষ্টা করুন।";
  }
}
