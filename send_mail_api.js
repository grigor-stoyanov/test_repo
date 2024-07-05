export default async function sendMail(signal) {
  try {
    const url = "https://api.restful-api.dev/objects";
    const postdata = {
      subject: "test",
      content: "lorem ips amet, consectetur adipiscing elit",
      email: "email@example.com",
    };
    const fetchOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(postdata),
      signal,
    };
    const response = await fetch(url, fetchOptions);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    } else {
      const data = await response.json();
      console.log("POST request successful. Response:", data);
      return data;
    }
  } catch (error) {
    if(!(error instanceof Error)){
        console.log('Request aborted silently.');
        return;
    }
    console.error("Network Error during POST request:", error.message);
    return error;
  }
}
