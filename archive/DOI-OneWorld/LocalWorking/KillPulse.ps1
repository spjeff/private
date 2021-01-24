while (1) {

	"Killing..."
	copy "C:\Windows\System32\drivers\etc\hosts-VPN-OFF" "C:\Windows\System32\drivers\etc\hosts" -Force -Confirm:$false

	Get-Process pulses* | Stop-Process -Force
	
	"Sleep"
	sleep (60*60)
}