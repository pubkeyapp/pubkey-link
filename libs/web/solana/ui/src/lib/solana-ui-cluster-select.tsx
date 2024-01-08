import { Button, Menu } from '@mantine/core'
import { useCluster } from '@pubkey-link/web-solana-data-access'
import { useWallet } from '@solana/wallet-adapter-react'
import { IconCurrencySolana, IconSettings } from '@tabler/icons-react'
import { Link } from 'react-router-dom'

export function SolanaUiClusterSelect() {
  const { publicKey } = useWallet()
  const { clusters, setCluster, cluster } = useCluster()
  return publicKey ? (
    <Menu shadow="md" width={250} withArrow>
      <Menu.Target>
        <Button variant="light">{cluster.name}</Button>
      </Menu.Target>

      <Menu.Dropdown>
        {clusters.map((item) => (
          <Menu.Item
            key={item.name}
            bg={item.active ? 'brand' : 'transparent'}
            fw={item.active ? 'bold' : 'normal'}
            color={item.active ? 'white' : 'dimmed'}
            onClick={() => setCluster(item)}
            leftSection={<IconCurrencySolana size={16} />}
          >
            {item.name}
          </Menu.Item>
        ))}
        <Menu.Divider />
        <Menu.Item component={Link} to="/solana/clusters" leftSection={<IconSettings size={16} />}>
          Manage Clusters
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  ) : null
}
