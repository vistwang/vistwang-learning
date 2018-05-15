import React from 'react'

const BankPayInfo = ({type}) => {
	return (
		<div className="m1-row bankpay-info">
			<h3>银行电汇／转账</h3>
			<div className="m1-row">
				<div className="m1-col-5">
					<p>户名：上海梅花信息股份有限公司</p>
				</div>
				<div className="m1-col-7">
					<p>开户行：招商银行上海分行天山支行</p>
				</div>
			</div>
			<div className="m1-row">
				<div className="m1-col-5">
					<p>账号：2149 8037 6210 001</p>
				</div>
			</div>
			<div className="m1-row">
				<p>付款后请拍摄凭据发送到邮箱：m1service@meihua.info，注明“M1云端市场部{type === 'charge' ? '充值支付' : '版本升级支付'}XXX元”，并留下您的姓名、M1注册邮箱和联系电话。</p>
			</div>
		</div>
	)
}

export default BankPayInfo