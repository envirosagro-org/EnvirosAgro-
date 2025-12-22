
interface Env {
  API_KEY: string;
}

// Definition for Cloudflare Pages Function context
type PagesFunction<Env = any> = (context: {
  request: Request;
  env: Env;
  params: Record<string, string | string[]>;
  data: Record<string, unknown>;
  next: (request?: Request) => Promise<Response>;
}) => Response | Promise<Response>;

export const onRequestPost: PagesFunction<Env> = async (context) => {
  try {
    const data: any = await context.request.json();
    
    // Designated destination address for EnvirosAgro network transmissions
    const destination = "envirosagro.com@gmail.com";
    const transmissionId = `TX-${Date.now().toString().slice(-6)}`;
    
    console.log(`[Edge] Routing transmission to: ${destination}`);

    // In a production environment with MailChannels, you would send the email here.
    // Cloudflare Pages Functions run on the edge for minimal latency.
    
    await new Promise(resolve => setTimeout(resolve, 200));

    return new Response(JSON.stringify({
      success: true,
      id: transmissionId,
      processedBy: "ENVIROSAGRO_EDGE_GATEWAY",
      timestamp: new Date().toISOString(),
      routing: {
        target: destination,
        status: "DELIVERED_TO_GATEWAY"
      }
    }), {
      headers: { 
        "Content-Type": "application/json",
        "X-Resilience-Node": "CLOUDFLARE_EDGE"
      }
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Transmission node error. Handshake failed." }), {
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }
};
