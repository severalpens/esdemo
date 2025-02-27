using System;
using System.Collections.Generic;

namespace FunctionApp1;

public partial class ApiKey
{
    public int ApiKeyId { get; set; }

    public int ClusterId { get; set; }

    public string? Name { get; set; }

    public string? KeyType { get; set; }

    public string? KeyValue { get; set; }

    public virtual Cluster Cluster { get; set; } = null!;
}
