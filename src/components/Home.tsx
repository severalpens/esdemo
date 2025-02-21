import { NavLink } from 'react-router-dom';

// App.js
function Home() {
    return (
      <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
        <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
          <div id="h1-title" className="flex flex-col items-center sm:items-start gap-4">
            <h1 className="text-4xl font-bold text-center sm:text-left">Elasticsearch Research</h1>
            <p className="text-center sm:text-left"></p>
          </div>
          <div>
            <h2 className="text-2xl font-bold mb-4">Routes</h2>
            <ol className="list-inside list-decimal text-sm text-center sm:text-left font-[family-name:var(--font-geist-mono)]">
            <li className="mb-2">
                <NavLink to={`/searchClientDemo`}><strong>/searchClientDemo</strong></NavLink>
                 - Searches client side JSON file.
              </li>
              <li className="mb-2">
                <NavLink to={`/searchHybrid`}><strong>/searchHybrid</strong></NavLink>
                - Hybrid search
              </li>
              <li className="mb-2">
                <NavLink to={`/searchFullText`}><strong>/searchFullText</strong></NavLink>
                 - Full text search
              </li>
            </ol>
          </div>
          <div>
            <h2 className="text-2xl font-bold mb-4">Layers</h2>
            <ol className="list-inside list-decimal text-sm text-center sm:text-left font-[family-name:var(--font-geist-mono)]">
              <li className="mb-2">
                <a href="https://gray-smoke-064726800.4.azurestaticapps.net/">
                  Next.js Client (https://gray-smoke-064726800.4.azurestaticapps.net/)
                </a>
              </li>
              <li className="mb-2">
                <a href="https://api.yellowbush-3996721f.centralus.azurecontainerapps.io"                >
                  Python Flask API (https://api.yellowbush-3996721f.centralus.azurecontainerapps.io)
                </a>
              </li>
              <li className="mb-2">
                <a href="https://7441222d1c12456cae009f0c5f878e45.westus2.azure.elastic-cloud.com:443">
                Elasticsearch Cluster (https://7441222d1c12456cae009f0c5f878e45.westus2.azure.elastic-cloud.com:443)
                </a>
              </li>
              <li className="mb-2">
                <a href="https://esresearch.kb.westus2.azure.elastic-cloud.com">
                Kibana (https://esresearch.kb.westus2.azure.elastic-cloud.com)
                </a>
              </li>
            </ol>
          </div>
          <div>
            <h2 className="text-2xl font-bold mb-4">Repos</h2>
            <ol className="list-inside list-decimal text-sm text-center sm:text-left font-[family-name:var(--font-geist-mono)]">
              <li className="mb-2">
                <a
                  href="https://github.com/severalpens/elasticsearchclient"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Client Repo
                </a>
              </li>
              <li className="mb-2">
                <a
                  href="https://github.com/severalpens/esresearchapi"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  API Repo
                </a>
              </li>
            </ol>
          </div>
          <div>
            <h2 className="text-2xl font-bold mb-4">Demo Source Files</h2>
            <ol className="list-inside list-decimal text-sm text-center sm:text-left font-[family-name:var(--font-geist-mono)]">
              <li className="mb-2">
              <NavLink to="/main.json">
            main.json 
          </NavLink>
          - An extract from &apos;main&apos; index in Elasticsearch.
          </li>
            </ol>
          </div>

        </main>
        <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
        </footer>
    </div>    );
  }
  

export default Home;