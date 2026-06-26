const { Callout, CodeBlock } = window.XuanwoDesignSystem_8e9a9d;

const READ_FN = `use opendal::Operator;\nuse opendal::services::S3;\n\nasync fn read_config(op: Operator) -> Result<Bytes> {\n    // A single call — the layer stack handles retries,\n    // logging, and concurrency underneath.\n    let bs = op.read("config/漩涡.toml").await?;\n    Ok(bs)\n}`;

function ArticleBody() {
  return (
    <article className="prose">
      <p className="lead">
        OpenDAL gives you <em>one</em> API for every storage service. You call <code>op.read(path)</code>, and
        whether the bytes live on S3, a local disk, or a remote HTTP server is somebody else&rsquo;s problem.
        But what actually happens between that call and the bytes landing in your buffer?
      </p>

      <h2 id="the-operator">The Operator</h2>
      <p>
        Everything starts with an <code>Operator</code> — a cheap, cloneable handle around a configured backend.
        Constructing one wires up a <strong>layer stack</strong>: retry, logging, metrics, and concurrency limits
        all wrap the raw accessor before you ever touch it.
      </p>
      <CodeBlock language="rust" filename="src/config.rs" lineNumbers highlight={[7]} code={READ_FN} />

      <Callout variant="note" title="Note">
        每个 <code>Operator</code> 都是廉价的句柄 — clone 它几乎没有成本,所以放心在任务之间传递。
      </Callout>

      <h2 id="the-read-path">The read path</h2>
      <p>
        A <code>read</code> is not one operation but a small pipeline. The path is normalized, the request flows
        <em>down</em> through each layer, the backend issues the actual network call, and the response flows back
        <em>up</em> — each layer observing or retrying as configured.
      </p>
      <ol>
        <li>Normalize the path and resolve it against the backend root.</li>
        <li>The <strong>retry layer</strong> wraps the call with backoff on transient errors.</li>
        <li>The <strong>concurrency layer</strong> waits for a permit so you never overwhelm the service.</li>
        <li>The backend translates the request into the service&rsquo;s native protocol.</li>
      </ol>

      <blockquote>
        A good abstraction doesn&rsquo;t hide the cost — it makes the cost <em>predictable</em>.
      </blockquote>

      <h2 id="streaming">Streaming, not slurping</h2>
      <p>
        For large objects you rarely want the whole thing in memory. <code>op.reader(path)</code> returns a stream
        that pulls ranges on demand, so a 10&nbsp;GB file costs you a buffer, not 10&nbsp;GB of RAM.
      </p>
      <Callout variant="warning" title="Heads up">
        Range reads multiply your request count. Tune the chunk size to your service&rsquo;s pricing — small chunks are
        gentle on memory but harsh on your bill.
      </Callout>

      <h2 id="wrapping-up">Wrapping up</h2>
      <p>
        The magic of OpenDAL isn&rsquo;t any single clever trick — it&rsquo;s the discipline of a clean layer stack and
        a narrow, honest API. 把复杂留给库,把简单留给用户。 That&rsquo;s the whole game.
      </p>
    </article>
  );
}
window.ArticleBody = ArticleBody;
