##############################################################################
#
##############################################################################

@CLASS
PaymentTypeApi

@USE
json_api/json_api.p

@OPTIONS
locals

@BASE
JsonApi



##############################################################################
# Определяем resource
##############################################################################
@define_resource[]
	$result[^PaymentType:all[]]
#end @define_resource[]