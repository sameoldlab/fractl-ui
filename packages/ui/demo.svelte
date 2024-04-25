<!-- <svelte:options tag="my-app" /> -->
<script lang="ts">
	import type { ConfigDisconnected, StateDisconnected } from '@fractl-ui/types'
	import ConnectModal from './src/components/ConnectModal/ConnectModal.svelte'
	import { readable } from 'svelte/store'
	const state: StateDisconnected<unknown> = {
		activeRequest: null,
		current: null,
		status: 'disconnected'
	}
	const icon =
		'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAaoAAAGqCAYAAABajwD2AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAB0ASURBVHgB7d2/jx1X2Qfws04oSKR4aeiInSAiCkhcIiSwjaAnHVKEsAtaJCokChwiEBIV/gdwQkGHCBKUARuoqGwFUVCALdFBYdMgJJJ93+u892Vycn7N3bl7n737+Uir3b135szc2d3znefM2TsHKaWjBABBnUsAEJigAiA0QQVAaIIKgNAEFQChCSoAQhNUAIQmqAAITVABEJqgAiA0QQVAaIIKgNAEFQChCSoAQhNUAIQmqAAITVABEJqgAiC0JxOcIQcHB2kJR0dHCTgZKioAQhNUAIQmqAAITVABEJqgAiA0QQVAaIIKgNAEFQChCSoAQhNUAIQmqAAITVABEJqgAiA0QQVAaIIKgNAEFQChCSoAQnOHX86Mr33ta+natWtpCd/85jfT3bt3E7B9gooz4+LFi+ny5ctpCYeHhwk4GYb+AAhNUAEQmqACIDRBBUBoggqA0AQVAKEJKgBCE1QAhCaoAAhNUAEQmqACIDRBBUBoggqA0AQVAKEJKgBCE1QAhCaoAAhNUMEOre46fHR0tMjHrVu3EuwjQQVAaIIKgNAEFQChCSoAQhNUAIQmqAAITVABEJqgAiA0QQVAaIIKgNAEFQChCSoAQhNUAIQmqAAITVABEJqgAiA0QQVAaE8mhl25ciUt4eHDh+nu3bsJVlZ3591nly5dSoeHh2kJt2/fTpw9gmqGX//612kJd+7cSVevXk0Q2cHBQVrCz3/+83ThwoV0XPfv30/PP/984uwx9AdAaIIKgNAEFQChCSoAQhNUAIQmqAAITVABEJqgAiA0QQVAaIIKgNAEFQChCSoAQhNUAIQmqAAITVABEJqgAiA0QQVAaKtbeO73fbAX9OqrrybGLHWsPvaxj6WvfOUraQlf+tKX0he/+MW0hDfeeCM9ePAgHdfqFu3f+MY30hLu3buXfvGLX6Rojo6W6WIePnyYbt68mTh7BNUMS92a+/Lly+k3v/lN2mdLHavPfvazj29lvoSnn3768Qcn67nnnnt8G3nYlKE/AEITVACEJqgACE1QARCaoAIgNEEFQGiCCoDQBBUAoQkqAEITVACEJqgACE1QARCaoAIgNEEFQGiCCoDQBBUAoQkqAEJ7MjFsqVtqnwVL3cH4mWeeSR/5yEfSEs6dc142anXL9zfffDMt4caNG+nixYvpuFa3on/55ZcTZ4+gYiuuXLmSOL3u3r2bbt++nZZw69atRYLK7ezPLqeYAIQmqAAITVABEJqgAiA0QQVAaIIKgNAEFQChCSoAQhNUAIQmqAAITVABEJqgAiA0QQVAaIIKgNAEFQChCSoAQhNUAIR28L8f7q9+wlZ3v13qVu377u23307f+ta30hJeeeWVxx/w+uuvp+vXrydOBxUVAKEJKgBCE1QAhCaoAAhNUAEQmqACIDRBBUBoggqA0AQVAKEJKgBCE1QAhCaoAAhNUAEQmqACIDRBBUBoggqA0AQVAKE9mThxDx8+TLdv305LuHjx4uOPffX000+nT3/602kJ//rXvxY77kta3fGZk3V4eLj3xz3i7/qm3Ir+lHv11VfTjRs3En3f/e6r/3u8vpsiWZ1k/PWvf02wpPv376fnnnsu7QtDf5whBwk4fQQVAKEJKgBCE1QAhCaoAAhNUAEQmqACIDRBBUBoggqA0AQVAKEJKgBCE1QAhCaoAAhNUAEQmqACIDRBBUBoggqA0Nzhd4bV3XSjuXz58mK31H799dfTgwcP0hIODpa5SeFHP/rR9IUvfCEt4e23305//OMf07566aWX0pe//OXEyXrzzTfTvXv3UiQPHz5MP/rRj9K+EFQzHB3t96G6evVqun37dlrCuXPLFOuf+tSn0ve///20hBdeeOHxRyRL3jL82rVr6datW4mTdf369ccneWyPoT8AQhNUAIQmqAAITVABEJqgAiA0QQVAaIIKgNAEFQChCSoAQhNUAIQmqAAITVABEJqgAiA0QQVAaIIKgNAEFQChCSoAQnOH3xnefffdtJSlbtW+pLt37z6+hfUSlnp9Tz311GJ3wF219eEPfzhFsjreS93G/OLFi48/lnDz5s3Ht1hfwuquw0vtV0RL/t2s7ha8uusz7/dkgv9z6dKlFM3R0X6fRx0eHqYrV66kaFad7+3btxN9Ef9u9o2hPwBCE1QAhCaoAAhNUAEQmqACIDRBBUBoggqA0AQVAKEJKgBCE1QAhCaoAAhNUAEQmqACIDRBBUBoggqA0AQVAKEJKgBCcyv6GZa8FT1j7ty5k65evZr21eoW7X/5y19SRAcHB2kJ+36X5iU9//zzi9yKfsnfqzfeeCNdv3497ZKKCoDQBBUAoQkqAEITVACEJqgACE1QARCaoAIgNEEFQGiCCoDQBBUAoQkqAEITVACEJqgACE1QARCaoAIgNEEFQGiCCoDQnkwMW91tdgnnz59Ply5dSrCy1O/V4eFheumll9JS3Jn3dFvq9+ru3btp19yKfgcuX76c3nrrrbSE1e3Cl7pleET7fiv6JV27di39+Mc/TpxeS92Kft8Y+gMgNEEFQGiCCoDQBBUAoQkqAEITVACEJqgACE1QARCaoAIgNEEFQGiCCoDQBBUAoQkqAEITVACEJqgACE1QARCaoAIgNLei34EHDx6k1157LS3hypUrjz/21bPPPpu+853vpCXs852QV5a8DX1EDx8+TDdv3kz7bPUa+SC3oj/lbty4EbIjPzpa7tdqqbZWry9iWC15rPbZ6hbtH//4xxNnj6E/AEITVACEJqgACE1QARCaoAIgNEEFQGiCCoDQBBUAoQkqAEITVACEJqgACE1QARCaoAIgNEEFQGiCCoDQBBUAoQkqAEJzh98dePHFF9MPf/jDtITf//736Xe/+11aylJ3wH3rrbfSUpa8A+4+3+E34mtbWer1rW7Tfu/evbSEO3fupNdeey1xOjyZOHGHh4fp85//fFrCKqRWf3SMcdv302v1d3P58uW0hAcPHiROD0N/AIQmqAAITVABEJqgAiA0QQVAaIIKgNAEFQChCSoAQhNUAIQmqAAITVABEJqgAiA0QUVYqzeQXX2s3xW89O7g08eWevfwVTu9bbXWLbVRWzfqO55DJIKK8ErveL7u4NfPrb6vvTN6Hga90Ji2Mw2e6bZ622m9S/vocsB7BBVh5YGQd+qlEBlZr9bOtHrL28ufW1dMeejUgqcXckCdoCK82jDauvNvhVRtGG9quv40hNbf59spPddqtxWcggv6BBVhlYJo/X0eKHl4lCqj6XK94cBamKyrq1IIlaqs0j6MPge8Z+/v8Hv+/Pn0oQ99KC3hH//4R1rCb3/72/TUU0+lffbEE0+k43rnnXeqYTUdjpt+Xer4p8/lkzNK7deGCluBVVo3v65VC9HV9//5z39SJF//+tfTT37yk7SEP//5z+nChQvpuFZ35X3hhRfSEr761a+mf//732kJSx4rylRUhDXtyEtVSh4WpetIpbZakzNqj5WGG0vPtyZKlIYMa/sD/JegIrzSUN/68dLw3/T5tdJQYK26qbXVqp5KAZZf65ruSy1QgQ/a+6E/9su0kipVNJvoXa9aP9abHNGbJFEKNhUV9KmoOBVKlVStopkuX5tUkS9fm7CRbzt/rlQRrZ8vVWH5Pgop6FNREVrpf6R6lU2+bO9aVWsiRb5O6fHWNa/S9lozB4EPUlERVi0YSjPuplPDe9XW+uvSLL7WvuSV1Prx6TLTz/msxLy9fP+AMhUVp0JvEsRaLQBGqrJ8mnv+OV+mtN1aSJYqOJUUjBFUhDWtSGrPr/Vm0dWG+qbfl6qf1rZbbebrloJOJQVjDP0RXj4x4aDwbhDr5dafS8OGB43/i8qrptY1rF4ldFCZkj79eqQd4D2CirBakyHy71uVVKmt1tBfrToqBdho2EyrqNK1NaDO0B+nRmmK+vrr0nKl60h5QJWqpXWYtKqy2jWqUgDWrmkZAoQxKirCKk1oyGfetWbvta5F5c+XQqj1fF4Z1SqxfJn8ayEFfSoqwmpdy6k9V6tSSpMZSkOKvTDLt1/bl1I7pa/zdoEPUlERVq+iyTv+fJk8lFoV07Sd2rWq0RmApW2Upq2XhgmBDxJUnAqlIFppDdm1KpVSCJVm/uWzCvMALO1j3n5tW7XngfcTVISVh8Ra6fpQvl5ecZWW700jz9ftVT61yqo1YUJIQZ9rVIRWCpF88kS+fD7MV5pwMdW7FpbvR29bpfVq35f2B3i/vQ+qaHdOZb7ahITSc7VgqgVRa5nWhIjWcqV281DLZzL+4Q9/SMf1zDPPpE9+8pMpmnv37j2+O+9xLdHG2qNHjx7faXsJ9+/fT2zX6q/G2AMhrU8yRiqOWqi0ZgaW1l+3ka/fGh4s7UNtll8p1FaPfeITn0jH9fLLL6cf/OAHaQlur04khv4Ia/SaUGnZkeG8aRul9XvttNod+br1GPBfJlNwavU6+LnhcpxlgO0RVACEJqgACE1QceoZmoP9Jqg49U77P836p19oE1QwsYvqTEUIbYIKJnZR3aiooE1QwQZq/3e17XXhLBJUsIHSLUI2XRdoE1SEdRo79JE3zgXmEVSENbeDjxAII/ejAuYRVIQ1N3hOSyCosGAeQUVYo28Gu9Z6w9fam9eOtrPp9oHjE1SE1quSRt5hPf88us5co+sZCoR5BBXh9e7oO/26dMuO3Nyg2EaFpfqCcYKKsEq3ge+FzPqOucfZXqnNTbTWU1XBODdOJKy8M8/vtBtV6c7ApbsET7//+9//no7rV7/61SLtrCx1m3ZYglvRE9Y777zTfL4XXHOC7aRDMN/eE088kYAyQ3+EN2dILr/NfGv9VltzZgmW1ms9lrdtGBDaBBXh9QKp9H1r/dHg2rTKqk3+mAbT9FqaiRXQJqgIrdTRt673jATLcQJiJCCnU+CngTR9fGR2IvAeQcWpUAujWtUzDYJNZ/PlwZI/lir7MlLdHWd2Ipw1gorQesN2eVBMP88Z8lsHW6v90X2thZAKCjYjqDgVatVUrbqpfT23/V57I+HXIrygT1ARVm1SwlptQkKpkipd1yq119uP1jqlii7/P6q8cjP8B32CirB6/yNVW3bOcyMVz3Hew69U9bk+BfN4ZwpOhdoddfMJDLWwmPN4bZs1tWDM35miNNlCYEGfoCK01sSIdWWSB04+HFh6biQg8vVbYVh7rLUP09cB1Bn641Spdfy1qeila1i99kvXmKZtjbSx/lwa5jOBAuYRVIS16dTwldZwX/796My91uSO0eG80n4JLmgz9EdY586d2+jaVH5taPp8a9itN0xX+r60T61le/sOfJCKitCm07lLVUtpinptwkKrIpq2Vaqi8vDrDSnWKrHpNoAxbvNBWPltPkZm79WG1lrrjVY2pckVveHFWqDlYbWqHoEyfx2EVrs+1LpGlK9XGt5baYXUdP2R4cVatTd9rDSMaNgP+gQVYZUqnnxa+vrxtVaFU6qASkNxI0N1vWHA0hBiqSKbfg+ULTqZYqlxd3+4p9962K503ah2DWmqNTtuGlbT70ufS+3Xhuym26gpVVX59qbLtoYBp+sCdWb9sVWtyqM3IWG6Xq/Dzz/XqrDa+vm6I+FZCsfWcShVXEIK+gz9sTWl60srpaqkdL2mV/nUZvPVhvFa+9IKwlaQlsKv97qnoZXvL/BBgoqtyDvro8rEg+kya3mQ5Y/l3/eGEvPrRet2S8N1pfVq7dbaLGkFGNBm6I+tyYe3aqGzVhpaqz3XGy4s7Uv+fO1zLcDy19JrMw/I0nUzoQV9goqtqA3vjVQVrRCYO0kiD4r159I1rOn6tbZrAVZ6za3X1arUgPcz9MdW1DrvUtC0Aqw3nLZWCsJS8OQTKFoTJ0qTH6br5vu3XqcXavl+qaqgTUXFVpQqkunnVkjUhtdq1U+pOqkFSb4P0/1rzfRrDdnVgqa2D71rX8D7qajYiml1MVULsDw08ms8IxVIayiwNykir4ry5WpDmdPna4FTCtv8tQJ1Kiq2phQqpSG+WkfdWqY3qWH6/ei1rFL70+dKIVObYVjaXmkbBwf+lwp6VFRsTemaTm5OJ90Ll9K2WpMjekOGeXulSqrU5rQSzCeC1NYD6lRUbF1pKG39eG3CwlTvmk6roy+137t+NQ2a0vZqy0+fa1VW668FFIxRUbE1pWszrQ66du2nNLyXh8h0vfzrvP280hl9La2ZfKNtTJdvVWfAf6mo2Ip8hl6vslk/Pl1m/VxpQsRa7ZrXaAC0qqWag8YMwFbbtUkhwgraBBVbMVJllIbG5rRVq3Cm64xso7WvvW2UQmbufhkChLbVX8hip3NL/cE5wzz93n333cQ4d/iFOn8dAIQmqAAIbbFrVM8880w6f/58WsKjR4/SP//5z0Tf6pgfHh4mTrcLFy6kSFZ/gw8fPkwQwWLXqD7zmc+kn/70p2kJN2/efPxB37e//e30ve99L8HSXDcjCr+JAIQmqAAITVDBDP7nCU6eoIIZ/I8fnDxBBQHtonJTLRKVoIId6b1100lTLRKVoGKnzvJZvGCAMYKKjZzk+zoakoKzTVCxkdFqYImQUXnA2SaoWFzrbrxLtLmPVI1QJ6jOgJPuBLdRAW3a5mkJAFUj1AmqMyC/HfuSogdBlAAYvUkk8EGC6oxpddybdJ7HCYKz1Fnnx0kFBeMEFf9v08qrt2zrVvK8R4UFdYKKojkh0lt26SrupJ3EPi4d2oKPfSKo2KkIkyR6bUUK2tHtqVbZJ4KKU2Nk2nutI9/W2xXNXfe4wbbtAFKJEdFit6L/29/+ln72s5+lJfzpT39K++zZZ59Nn/vc59ISXnzxxbQvVp1kqyPOr6GVlq2tf1orjN4x2aZXXnklRfLo0aP0y1/+MnH2LHYresatQurOnTvve2zTDumkOrK525mzfG/ZbbzGXQbAdPvHee0ndVx2faym+6HiO5sM/e3Y+g9vyY5gG3/Mc2YEzu3YjjMZo7cf21z+OO2uX1MpFErLlZzUP1ZHeXcR193OLkG1Q0ucqa7PyvPHRrY98lhtm8d5vmbONPeRf6CdW4lsq0NeMrTnbHdbRrYz5+cBPYJqhzYd6luindGO+iSrkjkBeJx/oJ37OudO0DipDnlOIG7y+mpGXp9QYkmCKphepXPSs756Q1Ot5XuvpdfW3PWPY5Mhtm38LEaOwdztz5mkchyb/DxG13Ft6mwTVDsyZ+htqcprRK/aWD8/cm2tV7WNVEWtINxWaC/9P1pzKrLW8V3yZ9rbjxFLDTmPUKGdbYJqR7Z9lr5J51Q7m9/kes6cyqBmtY1t/p9S7RjMrSJrj63kr2G0Om4d802qyiUqs03Wq4VZ63erFe6cTYIqkNbF/5HHjrut41z3mbO9JUJsZDubLFvaz5Hj0gu3OcvNeaeM0ROGJSqz6frrNubs63T9XkiroJgSVAFs8sc+J9Raj4/YZDbeaLUwUsG0trepkTZaFczcn9mcymdkUsRo1TEaxr19qq0/5zpZvs5xq1/ODkEVwOgf7siZ7JwhxSWmo+cd69yOq/Ta58z+29Qmldf0tc7dh9Gfy+hrb1Udczr1kYqsFnZzhiCPG5gqrLNNUAUy0knVOspNrwGtw2+TKqbWiZXaK52Vzwmn1j5tcmZeWnfTYazW9739qK0zul9zj8Hcinu0Mj5ukAgiWgTVjswdwimtu4R1+PWuIc0Zfiy1lwdTa/1829PP069b1c1o6Ix0tq0w71VEI+u1rotNj32prTk/l9pzI0F4nOVLz9WOy5K/2+wPQbUj6467FxK1dUce65lbJW2qFAqjHVovUI47BDrSWeb7MKf6LA3RHcyYgVf7Pu/0R4bwRrY7UqHNDcLSPpaOS76+0GJNUAVTOyPf5KJ37/nRDrTWqfS2ke93KYBK65aqr5pN9qu3fq/6m7N/o9vsKXX0pa9b69ZCoHWdcO6+1oZ95x6zkfDl7BBUOzJ6Flwamps+P9XrDFrBtGl1ly/b2odaNTB9ftpOb1tz9m3kdfWCdGrTqqKldlxabY5oVS4jx2LE9OdWqwJ72+ztnwrr7BJUO5J3nCPXP0b+aOdMbhi9TlKSt9k62+9VJ/lzI8NxtSGq2nHsVRDTx3uWqG5L1vtZOonZ5KRhZN1Nq7R1u60TlNbv9egxnBNu7C9BtWOlTqlmk069VClN2xoJyOlyrTPnfPne8FEtbFpDUdNtlzqy3vBW/nhreLLW4U+3WXsNudHlRq7d1NqeLls7Ocn3o/S7Ump35PckX7d1fW4kiEs/c84mQbVjeYfbMhoqvUqpt35p2VowHMc0yDapKHuVW23d6WvJO8DWsWsdq1anPX1sJAha1WNpudp+lY5v6+ShFvqtn3spFFvHaiS4lvjdYr8sdit6xpU6wOnnfJl8vbzjmHum2Vs/36f1Y5u0X3puKu9MS9stLVPSCouRIBnZ39E2Wseu9DMeCcF8aLAVpPmxOqoMzdV+z0Yr5/Uyre9b2yz9THvrL2Hu3wy7paLakWmHs9I606117rXla+uVtM7wW0Mv+Xp5xVJ7btpWrYMrdaqlZZZQ2r/14/m+1gKn1F7v2JUqkenztfZ72+9p/ZxK+5CvOz0O+edaW+vXuclw41LBxOkmqHak1dHWOvBWhzqnnd7ypbP1fJvTTme6fKvjzb/O1TrRpfT2bbpM3iEfDA7vldatKR23/BjUKp7p51ZlNH1dtfbyZafLt45ZXgVPj12+fP5RO6al9YQVgmpHSkNDrT/I/ExzrXZmXvu+1zn09nm9zen2p89PX1Or4shDoFdB1fal9v30sVoHmu/zepl8+VYHX6sORvc71zp+pZ/d6MlL7bXX1qkF18i+j2ynF8Ij7XJ2CKodyTvEWkeQ/2HPOfPOtzf9nG+jNuQyPWPOz4RHArb0/HR/p2fZrX3qtZ0Hdik0ascu16sm8+1O16tVYb2wHDFSwbWWy7eVrzen4qwt1wvX0X0b/d3ibBBUO9T6A847uulytWCqdUIjZ/F5cJa2W/p6+n1pmXx4q9bx1cKsVHHlQZmvk1J7KKvX+Y50jqXKp7Zf6+VLrzUP2mk7peCr7Ufe3vTrVjhNj0ktbFpaFXX+/HS5Vlulk4zWeuw/QbVjrY6odfZZWqcVLrX1W4/1zrZ7ap12rerpVTf5OtPnR8J4uk+jx60UIKPB36qA1u2V9i0/aaitt9YK7ryN6Xam666/zo9vrc3SycMc+e/9tL1auPV+n9lfgmpH8jPpTc4cS2fdpc+9P/xeB9XrCEfCtnaWPOd1rr8+6Ay7zWmvpXVcWkGXL7v+ulYdj7Q1GlKbBndp32sVYP67M30t032qtZn/PPN1889CCv9HtUMjZ6S1kFgpnYG3AqHWyU2XHe04Sx14qZNsBUht//IOL29vNKxGAjo/hqUOePp9aTv59krHubT9vL2jo6OhTrm0r73XOn1s2sb663z/a22Xjl3p59Q6Xq3jnG8HVgRVMKWOpHbWnK+TrzdneyNt19ZtPdYL49YZfau9keOTL1urjPK2Sttr7VvrdY0co1I10fo5lparvdaRYz6yndbzre3Unhv5PSn9vDibBFVQczv8kec22e6cZTbZ9kgn1lqv1JnWjt2cMDquOa9r02NQWq4XLr3n5iyz7TaEE2uuUQEQmqACIDRBBUBoggqA0AQVAKEJKgBCE1QAhCaoAAht9R913qtkgLd02Uzt3Qlq7zrQejcDWMrq9+zcOefpp4WfFFvVewuf0tseld5CB5bkROh0EVRs3dz3ilNVAVOCapCz+3lax6tUMZWGAh1zYEVQDXJ2P0/vePVulTHSBmzKSdDpYjLFIL/Y2zH3tiSwFL93p4eKapCgmm/kmOX3iQLICapBzr7m6w3t5csJLKBEUHGiBD4wl6AiDCEGlAgqtspwHnBcgmqQDnczqiTguATVIB0uwG4IqkEqKoDd+B+o3yc4nhJFRQAAAABJRU5ErkJggg=='

	const config: ConfigDisconnected<unknown> = {
		accountData: readable({
			account: null,
			balance: null,
			nameService: null
		}),
		state: readable(state),
		connectors: [
			{ name: 'Test', icon, type: 'injected' },
			{ name: 'Test', icon, type: 'injected' },
			{ name: 'Test', icon, type: 'injected' },
			{ name: 'Test', icon, type: 'injected' },
			{ name: 'Test', icon, type: 'injected' },
			{ name: 'Test', icon, type: 'injected' },
			{ name: 'Test', icon, type: 'injected' },
			{ name: 'Test', icon, type: 'injected' }
		]
	}
</script>

<header></header>
<main>
	<div class="hero">
		<h1>
			<!-- Fractl-ui -->
		</h1>
		<p>
			modular dapp UI library for the EVM <span class="whisper">
				and (soon) Starknet and Cosmos and Fuel and...
			</span>
		</p>
	</div>
	<ConnectModal {state} {config} />
	<!--
	{#if connected}
		<AccountDialog config={$config}></AccountDialog>
	{/if} -->
</main>
<footer class="links">
	<a href="https://github.com/sameoldlab/fractl-ui">
		<svg
			height="20"
			aria-hidden="true"
			viewBox="0 0 16 16"
			fill="currentcolor"
			version="1.1"
			width="20"
			data-view-component="true"
		>
			<path
				d="M8 0c4.42 0 8 3.58 8 8a8.013 8.013 0 0 1-5.45 7.59c-.4.08-.55-.17-.55-.38 0-.27.01-1.13.01-2.2 0-.75-.25-1.23-.54-1.48 1.78-.2 3.65-.88 3.65-3.95 0-.88-.31-1.59-.82-2.15.08-.2.36-1.02-.08-2.12 0 0-.67-.22-2.2.82-.64-.18-1.32-.27-2-.27-.68 0-1.36.09-2 .27-1.53-1.03-2.2-.82-2.2-.82-.44 1.1-.16 1.92-.08 2.12-.51.56-.82 1.28-.82 2.15 0 3.06 1.86 3.75 3.64 3.95-.23.2-.44.55-.51 1.07-.46.21-1.61.55-2.33-.66-.15-.24-.6-.83-1.23-.82-.67.01-.27.38.01.53.34.19.73.9.82 1.13.16.45.68 1.31 2.69.94 0 .67.01 1.3.01 1.49 0 .21-.15.45-.55.38A7.995 7.995 0 0 1 0 8c0-4.42 3.58-8 8-8Z"
			></path>
		</svg>
	</a>
</footer>

<style>
	header {
		display: flex;
		flex-direction: row;
		justify-content: end;
	}
	.hero {
		align-items: center;
		display: flex;
		flex-direction: column;
		gap: 0.15rem;
		max-width: 40ch;
		margin: 0 auto;
		text-align: center;
	}
	h1 {
		font-weight: 300;
		font-family: system-serif, cursive, 'Times New Roman', Times, serif;
		margin: 0;
	}
	p {
		opacity: 0.8;
		font-size: 1em;
		font-weight: 500;
	}
	:root {
		background: hsl(0, 0%, 25%);
		color: aliceblue;
	}
	.links {
		margin: 1rem;
		position: fixed;
		bottom: 0;

		& a {
			color: inherit;
		}
	}

	main {
		display: flex;
		padding: 10vh 10vw;
		flex-direction: column;
		gap: 3em;
		align-items: center;
	}
	.whisper {
		opacity: 0.5;
		font-style: italic;
	}
</style>
