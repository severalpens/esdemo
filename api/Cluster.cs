using System;
using System.Collections.Generic;

namespace FunctionApp1;

public partial class Cluster
{
    public int ClusterId { get; set; }

    public string? Name { get; set; }

    public string? Description { get; set; }

    public string? Url { get; set; }

    public string? KibanaUrl { get; set; }

    public string? Endpoint { get; set; }

    public virtual ICollection<ApiKey> ApiKeys { get; set; } = new List<ApiKey>();
}
