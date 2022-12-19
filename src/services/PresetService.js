const presets = {
  'csma_basic': {
    "topology": {
      "node_count": 6,
      "node_containers": [
        "csma_nodes",
        "p2p_nodes"
      ],
      "container_settings": {
        "p2p_nodes": {
          "id": 1,
          "name": "p2p_nodes",
          "type": "point_to_point",
          "data_rate": {
            "value": 100,
            "format": "Mbps"
          },
          "delay": {
            "value": 1,
            "format": "ns"
          },
          "network_address": "10.2.2.0",
          "network_mask": "255.255.255.0",
          "log_pcap": true,
          "nodes": [
            7, 9
          ]
        },
        "csma_nodes": {
          "id": 0,
          "name": "csma_nodes",
          "type": "csma",
          "data_rate": {
            "value": 100,
            "format": "Mbps"
          },
          "delay": {
            "value": 1,
            "format": "ns"
          },
          "network_address": "10.1.1.0",
          "network_mask": "255.255.255.0",
          "log_pcap": true,
          "nodes": [
            2, 3, 4, 7
          ]
        }
      }
    },
    "simulation": {
      "server": {
        "echo_server": {
          "id": 0,
          "name": "echo_server",
          "port": 9,
          "start": {
            "value": 1,
            "format": "s"
          },
          "stop": {
            "value": 10,
            "format": "s"
          },
          "network": "csma_nodes",
          "node": 7
        }
      },
      "client": {
        "echo_client": {
          "id": 0,
          "name": "echo_client",
          "port": 9,
          "start": {
            "value": 1,
            "format": "s"
          },
          "stop": {
            "value": 10,
            "format": "s"
          },
          "network": "csma_nodes",
          "node": 2,
          "server": "echo_server",
          "interval": {
            "value": 1,
            "format": "s"
          },
          "max_packets": 10,
          "packet_size": 128
        }
      }
    }
  }
}

export default presets;